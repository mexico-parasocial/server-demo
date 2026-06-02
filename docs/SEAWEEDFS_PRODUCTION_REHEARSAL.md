# SeaweedFS Production Rehearsal Runbook

Last updated: 2026-06-02

This runbook keeps the alpha production blobstore on Cloudflare R2 while using the Mac mini to rehearse local object storage operations with SeaweedFS 4.31.

## Operating Model

- Production alpha uses R2.
- Local SeaweedFS is for dev, backup drills, restore drills, and future storage-node practice.
- The Mac mini pulls VPS backups over SSH.
- Tailscale is the preferred private network for future Mac mini/VPS service links.
- Production storage switching is manual and checklist-gated. No script switches production automatically.

## Daily Local Seaweed Workflow

```bash
cd /Users/mlv/Desktop/TH1/PARA/dev-env/seaweedfs

./seaweed-up.sh
./seaweed-doctor.sh
```

Use local SeaweedFS from dev-env by loading the local profile values from:

```bash
PARA/dev-env/seaweedfs/storage.seaweed.local.env.example
```

Keep any real active profile in:

```bash
PARA/dev-env/seaweedfs/storage.active.env
```

That file is gitignored.

## Back Up Local SeaweedFS

```bash
cd /Users/mlv/Desktop/TH1/PARA/dev-env/seaweedfs
./seaweed-backup.sh
```

Default destination:

```bash
/Users/mlv/Backups/para/seaweedfs/<timestamp>
```

The backup includes the master, volume, and filer Docker volumes plus the local compose and S3 config used for the drill.

## Restore Drill

```bash
cd /Users/mlv/Desktop/TH1/PARA/dev-env/seaweedfs
./seaweed-restore-drill.sh
```

The restore drill uses the latest local Seaweed backup by default and starts a separate temporary compose project on high ports:

```text
Master: http://localhost:19333
Volume: http://localhost:18080
Filer:  http://localhost:18890
S3:     http://localhost:18333
```

The script prints the exact cleanup command after the drill starts.

## Pull VPS Postgres Backups To Mac Mini

First list remote backups:

```bash
cd /Users/mlv/Desktop/TH1
./scripts/pull-vps-backups.sh --list
```

Dry run:

```bash
./scripts/pull-vps-backups.sh --dry-run
```

Real pull:

```bash
./scripts/pull-vps-backups.sh
```

Defaults:

```text
VPS: root@74.50.126.41
Remote: /backups/para
Local: /Users/mlv/Backups/para/vps-postgres
Retention: 30 days
```

Override with environment variables:

```bash
VPS_SSH=para@100.x.y.z \
REMOTE_BACKUP_DIR=/backups/para \
LOCAL_BACKUP_DIR=/Users/mlv/Backups/para/vps-postgres \
./scripts/pull-vps-backups.sh
```

## Storage Switch Preview

Preview R2 settings:

```bash
cd /Users/mlv/Desktop/TH1/PARA/dev-env/seaweedfs
./switch-storage-preview.sh r2
```

Preview local Seaweed settings:

```bash
./switch-storage-preview.sh seaweed
```

This script only prints proposed env differences. It does not edit `WatZappa/.env`.

## Manual Production Switch Checklist

Do not point production PDS at SeaweedFS unless all of these are true:

- R2 remains healthy, or the incident requires a planned failover.
- SeaweedFS has passed `seaweed-doctor.sh`.
- A recent Seaweed backup and restore drill have passed.
- Blob objects have been copied and verified between R2 and Seaweed.
- `switch-storage-preview.sh seaweed` has been reviewed.
- `WatZappa/.env` has been backed up.
- PDS is restarted first, before the rest of the stack.
- `scripts/smoke-test-production.sh` passes after the switch.

For the current alpha, the expected outcome is to leave production on R2.
