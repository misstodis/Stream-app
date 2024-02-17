import { getSelf } from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream-service';
import ToggleCard from './_component/toggle-card';

type Props = {}

export default async function ChatPage({ }: Props) {
    const currentUser = await getSelf();
    const stream = await getStreamByUserId(currentUser.id);

    if (stream === null) {
        throw new Error('Stream not found');
    }

    return (
        <div className='p-6'>
            <div className='mb-4'>
                <h1 className='text-3xl font-semibold'>
                    Chat Setting
                </h1>
            </div>
            <div>
                <ToggleCard
                    field='isChatEnable'
                    label='Enable chat'
                    value={stream.isChatEnable}
                />
                <ToggleCard
                    field='isChatDelay'
                    label='Delay chat'
                    value={stream.isChatDelay}
                />
                <ToggleCard
                    field='isChatFollowersOnly'
                    label='Must be following to chat'
                    value={stream.isChatFollowersOnly}
                />
            </div>
        </div>
    )
}