import { create } from "zustand";

export enum ChatVariant {
    CHAT = 'CHAT',
    COMMUNITY = "COMMUNITY"
}

interface ChatSidebarStoreProps {
    collapsed: boolean;
    variant: ChatVariant;
    onExpand: () => void;
    onCollapse: () => void;
    onChangeVariant: (variant: ChatVariant) => void;
}

export const useChatSideBar = create<ChatSidebarStoreProps>((set) => ({
    collapsed: false,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true })),
    variant: ChatVariant.CHAT,
    onChangeVariant: (variantState: ChatVariant) => set(() => ({ variant: variantState }))
}))