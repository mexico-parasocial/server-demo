<script lang="ts">
	type Status =
		| 'draft'
		| 'experimental'
		| 'stable'
		| 'active'
		| 'planned'
		| 'deprecated'
		| 'implemented'
		| 'partial'
		| 'thesis';

	let { status }: { status: Status } = $props();
</script>

<span class="status-pill" data-status={status}>{status}</span>
