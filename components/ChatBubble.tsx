import { colors } from '@/constants/theme';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export type MessageRole = 'user' | 'bot';

export interface Message {
    id: string;
    role: MessageRole;
    text: string;
    time?: string;
}

interface ChatBubbleProps {
    message: Message;
}

export function ChatBubble({ message }: ChatBubbleProps) {
    const isUser = message.role === 'user';

    return (
        <View style={[styles.wrapper, isUser ? styles.wrapperUser : styles.wrapperBot]}>
            <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleBot]}>
                <Text style={[styles.text, isUser ? styles.textUser : styles.textBot]}>
                    {message.text}
                </Text>
            </View>

            <View style={[styles.meta, isUser ? styles.metaUser : styles.metaBot]}>
                {!isUser && (
                    <View style={styles.botAvatar}>
                        <Text style={styles.botAvatarText}><Image source={require('../assets/icons/navigation/luminha.png')}/></Text>
                    </View>
                )}
                {message.time && (
                    <Text style={styles.time}>{message.time}</Text>
                )}
            </View>
        </View>
    );
}

interface ChatBubbleListProps {
    messages: Message[];
}

export function ChatBubbleList({ messages }: ChatBubbleListProps) {
    return (
        <View style={styles.list}>
            {messages.map(msg => (
                <ChatBubble key={msg.id} message={msg} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        gap: 20,
    },
    wrapper: {
        maxWidth: '78%',
        gap: 4,
    },
    wrapperUser: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
    },
    wrapperBot: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
    },
    bubble: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    bubbleUser: {
        backgroundColor: colors.white,
        borderRadius: 18,
        borderBottomRightRadius: 4,
        borderWidth: 1,
        borderColor: colors.border,
    },
    bubbleBot: {
        backgroundColor: colors.yellow,
        borderRadius: 18,
        borderBottomLeftRadius: 4,
           borderWidth: 1,
        borderColor: colors.border,
    },
    text: {
        fontSize: 14,
        lineHeight: 21,
    },
    textUser: {
        color: colors.textDark,
    },
    textBot: {
        color: colors.textDark,
    },
    meta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 4,
    },
    metaUser: {
        justifyContent: 'flex-end',
    },
    metaBot: {
        justifyContent: 'flex-start',
    },
    botAvatar: {
        width: 22,
        height: 22,
        borderRadius: 20,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
    },
    botAvatarText: {
        fontSize: 8,
        fontWeight: '700',
        color: colors.white,
        letterSpacing: 0.3,
    },
    time: {
        fontSize: 11,
        color: colors.textLight,
    },
});