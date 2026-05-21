import { Layout } from './components/Layout.tsx.js'
import { ProfileInfo } from './components/ProfileInfo.tsx.js'
import { SessionInfo } from './components/SessionInfo.tsx.js'
import { TokenInfo } from './components/TokenInfo.tsx.js'
import { UserMenu } from './components/UserMenu.tsx.js'

export function Home() {
  return (
    <Layout nav={<UserMenu />}>
      <ProfileInfo className="rounded-md bg-white shadow-md">
        <div className="p-4">
          <TokenInfo />
          <SessionInfo />
        </div>
      </ProfileInfo>
    </Layout>
  )
}
