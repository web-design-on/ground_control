import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { colors } from '../constants/theme';

interface PrimaryProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
}

interface SocialProps {
    title: string;
    onPress: () => void;
    icon: string;
    variant?: 'filled' | 'outline';
}

export function PrimaryButton({ title, onPress, loading = false }: PrimaryProps) {
    return (
        <TouchableOpacity
            style={styles.primary}
            onPress={onPress}
            activeOpacity={0.85}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator color={colors.white} />
            ) : (
                <Text style={styles.primaryText}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

export function SocialButton({ title, onPress, icon, variant = 'outline' }: SocialProps) {
    return (
        <TouchableOpacity
            style={[
                styles.social,
                variant === 'filled' ? styles.socialFilled : styles.socialOutline,
            ]}
            onPress={onPress}
            activeOpacity={0.85}
        >
            <Text style={styles.icon}>{icon}</Text>
            <Text style={variant === 'filled' ? styles.socialFilledText : styles.socialOutlineText}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    primary: {
        backgroundColor: colors.navy,
        borderRadius: 100,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    primaryText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.white,
        letterSpacing: 1.5,
    },
    social: {
        borderRadius: 100,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 10,
    },
    socialFilled: {
        backgroundColor: colors.facebook,
    },
    socialOutline: {
        backgroundColor: colors.white,
        borderWidth: 1.5,
        borderColor: colors.border,
    },
    socialFilledText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.white,
        letterSpacing: 1,
    },
    socialOutlineText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.textDark,
        letterSpacing: 1,
    },
    icon: {
        fontSize: 18,
    },
});