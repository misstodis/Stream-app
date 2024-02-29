'use client';

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParticipants } from "@livekit/components-react";
import React, { useEffect, useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import CommunityItem from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

type ChatCommunityProps = {
    hostName: string;
    viewerName: string;
    isHidden: boolean;
};

export default function ChatCommunity({
    hostName,
    viewerName,
    isHidden,
}: ChatCommunityProps) {
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce<string>(value, 500);

    const participants = useParticipants();

    const onChangeInputSearch = (newValue: string) => {
        setValue(newValue);
    };


    /**
     * use memo that dependent on the participants and the debouncedValue
     * participants is the array of all the participants in the room (host and viewer)
     * this filter participants will be trigger when participants arr change (update) (means when have nieuw viewer come in the room)
     * also be trigger when the debouncedValue change (when the user type in the search input)
     */
    const filteredParticipants = useMemo(() => {

        //this recduce method is to remove the duplicate host of host out from the list
        const deduped = participants.reduce((acc: (RemoteParticipant | LocalParticipant)[], participant) => {
            /**
             * becase host have identity like host-id
             * and viewer have identity like id
             *  so this convert all participant identity to host-id
             */
            const hostAsViewer = participant.identity.includes('host') ? participant.identity : `host-${participant.identity}`;

            // this is to check if the participant host is already in the list
            // this will filter the host out of the list
            if (acc.some((p) => p.identity === hostAsViewer) === false) {
                // for the fist time this will add the the the participant to the list
                // because at fist acc is an empty array (reduce method in javascript)
                acc.push(participant);
            }

            return acc;
        }, [] as (RemoteParticipant | LocalParticipant)[]);


        // this using for the search that check if the participant name include the debouncedValue (the value that we type of the search input)
        // and return the array of the participant that include the carachter in debouncedValue
        return deduped.filter((participant) => {
            return participant.name?.toLowerCase().includes(debouncedValue.toLowerCase());
        });

    }, [participants, debouncedValue])

    if (isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    community is disabled
                </p>
            </div>
        )
    }


    return (
        <div className="p-4">
            <Input
                onChange={(e) => onChangeInputSearch(e.target.value)}
                placeholder="Search community"
                className="border-white/10"
            />
            <ScrollArea className="gap-y-2 mt-4">
                <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
                    no result
                </p>
                {filteredParticipants.map((participant) => (
                    <CommunityItem
                        key={participant.identity}
                        hostName={hostName}
                        viewerName={viewerName}
                        participantName={participant?.name}
                        paricipantIdentity={participant.identity}
                    />
                ))}
            </ScrollArea>
        </div>
    )
}