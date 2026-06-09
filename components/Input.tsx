import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { colors } from '../constants/theme';

interface Props {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    secureTextEntry?: boolean;
    keyboardType?: any;
    autoCapitalize?: any;
}

export function Input({
    placeholder,
    value,
    onChangeText,
    error,
    secureTextEntry,
    keyboardType,
    autoCapitalize = 'none',
}: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);

    return (
        <View style={styles.wrapper}>
            <View style={[
                styles.container,
                focused && styles.focused,
                error ? styles.errorBorder : null,
            ]}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={colors.textLight}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry && !showPassword}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
                {secureTextEntry && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Text style={styles.eye}>{showPassword ? <Image source={require('../assets/icons/input/visibility_off.png')} style={styles.visibilityIcon}/> : <Image source={require('../assets/icons/input/visibility.png')} style={styles.visibilityIcon}/>}</Text>
                    </TouchableOpacity>
                )}
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 16,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.inputBg,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: 'transparent',
        paddingHorizontal: 16,
    },
    focused: {
        borderColor: colors.primary,
        backgroundColor: colors.white,
    },
    errorBorder: {
        borderColor: '#E53E3E',
    },
    input: {
        flex: 1,
        height: 52,
        fontSize: 15,
        color: colors.textDark,
    },
    eye: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textLight,
    padding: 4,
    letterSpacing: 0.5,
},
    error: {
        marginTop: 4,
        fontSize: 12,
        color: '#E53E3E',
        fontWeight: '500',
    },
    visibilityIcon: {
        width: 20,
        height: 20,
    }
});