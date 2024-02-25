

import React, { useEffect, useMemo, useState } from 'react'
import { ChatVariant, useChatSideBar } from '@/store/use-chat-sidebar';
import { useMediaQuery } from 'usehooks-ts';
import { useChat, useConnectionState, useRemoteParticipant } from '@livekit/components-react';
import { ConnectionState } from 'livekit-client';
import { Input } from '../../ui/input';
import ChatHeader from './_component/chat-header';
import ChatToggle from './_component/chat-toggle';
import ChatForm from './_component/chat-form';

type ChatProps = {
    hostName: string;
    hostIdentity: string;
    viewerName: string;
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
}

export default function Chat({
    hostName,
    hostIdentity,
    viewerName,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly,
}: ChatProps) {

    const matches = useMediaQuery('(max-width: 1024px)');
    const { variant, onExpand } = useChatSideBar((state) => state);

    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);

    // check if the host online
    const isOnline = participant && connectionState === ConnectionState.Connected;

    const isHidden = !isChatEnabled || !isOnline;

    const [messageValue, setMessageValue] = useState('');
    const { chatMessages: messages, send, isSending } = useChat();

    /**
     *  effect to expand the chat if the screen is biger than 1024px
     *  when screen is smaller then 1024px retrun true else false
     *  */
    useEffect(() => {
        if (matches) {
            onExpand();
        }
    }, [matches, onExpand]);


    const reversedMessages = useMemo(() => {
        return messages.sort((messageA, messageB) => {
            return messageB.timestamp - messageA.timestamp;
        })
    }, [messages]);

    const onSubmit = () => {
        if (!send) return;

        send(messageValue);
        setMessageValue('');
    }

    const onChange = (value: string) => {
        setMessageValue(value);
    }

    return (
        <div className='flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]'>
            <ChatHeader />

            {/* chat all */}
            {variant === ChatVariant.CHAT && (
                <ChatForm
                    isDelayed={isChatDelayed}
                    isFollowing={isFollowing}
                    isFollowersOnly={isChatFollowersOnly}
                    isHidden={isHidden}
                    onChangeMessage={onChange}
                    onSubmitMessage={onSubmit}
                    messageValue={messageValue}
                />
            )}

            {/* chat community */}
            {variant === ChatVariant.COMMUNITY && (
                <p>All lover</p>
            )}
        </div>
    )
}