import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { PrimaryButton } from '../../components/Button';
import { Input } from '../../components/Input';
import { colors } from '../../constants/theme';
import { validateRegister } from '../../hooks/useValidation';

export default function RegisterScreen() {
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        password?: string;
        confirm?: string;
    }>({});
    const [loading, setLoading] = useState(false);

    function updateField(field: string, value: string) {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    async function handleRegister() {
        const { errors: formErrors, isValid } = validateRegister(form);
        if (!isValid) { setErrors(formErrors); return; }
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        router.replace('/welcome');
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
                 <View style={styles.curveTopRight} />
                        <View style={styles.curveBottomLeft} />
            <View style={styles.safe}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView
                        contentContainerStyle={styles.scroll}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                            <Text style={styles.backArrow}>←</Text>
                        </TouchableOpacity>

                        <Text style={styles.titleRegister}>Boas-vindas!</Text>

                        <TouchableOpacity style={styles.facebookBtn} onPress={() => { }}>
                            <Image source={require('../../assets/icons/social/facebook.png')} style={styles.socialIcon} resizeMode="contain" />
                            <Text style={styles.facebookText}>CADASTRE-SE COM FACEBOOK</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.googleBtn} onPress={() => { }}>
                            <Image source={require('../../assets/icons/social/google.png')} style={styles.socialIcon} resizeMode="contain" />
                            <Text style={styles.googleText}>CADASTRE-SE COM GOOGLE</Text>
                        </TouchableOpacity>

                        <View style={styles.divider}>
                            <View style={styles.line} />
                            <Text style={styles.dividerText}>OU CADASTRE COM E-MAIL</Text>
                            <View style={styles.line} />
                        </View>

                        <Input placeholder="Nome completo" value={form.name} onChangeText={v => updateField('name', v)} error={errors.name} autoCapitalize="words" />
                        <Input placeholder="Endereço de e-mail" value={form.email} onChangeText={v => updateField('email', v)} error={errors.email} keyboardType="email-address" />
                        <Input placeholder="Senha" value={form.password} onChangeText={v => updateField('password', v)} error={errors.password} secureTextEntry />
                        <Input placeholder="Confirmar senha" value={form.confirm} onChangeText={v => updateField('confirm', v)} error={errors.confirm} secureTextEntry />

                        <PrimaryButton title="CADASTRE-SE" onPress={handleRegister} loading={loading} />

                        <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={styles.loginLink}>
                            <Text style={styles.loginLinkText}>
                                JÁ TEM UMA CONTA?{' '}
                                <Text style={styles.loginLinkBold}>ENTRE</Text>
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    safe: { flex: 1 },
    scroll: {
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 32,
    },
        curveTopRight: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: 'rgba(235,227,210,0.5)',
    },
    curveBottomLeft: {
        position: 'absolute',
        bottom: -80,
        left: -80,
        width: 240,
        height: 180,
        borderRadius: 120,
        backgroundColor: 'rgba(235,227,210,0.4)',
        transform: [{ rotate: '20deg' }],
    },
    titleRegister: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.navy,
        textAlign: 'center',
        marginBottom: 24,
    },
    backBtn: {
        alignSelf: 'flex-start',
    },
    backArrow: {
        fontSize: 40,
        color: colors.navy,
        fontWeight: '600',
    },
    facebookBtn: {
        backgroundColor: colors.facebook,
        borderRadius: 100,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 16,
        gap: 10,
    },
    facebookText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.white,
        letterSpacing: 1,
    },
    googleBtn: {
        backgroundColor: colors.white,
        borderRadius: 100,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderWidth: 1.5,
        borderColor: colors.border,
        gap: 10,
    },
    googleText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.textDark,
        letterSpacing: 1,
    },
    socialIcon: {
        width: 20,
        height: 20,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
        width: '100%',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border,
    },
    dividerText: {
        fontSize: 11,
        color: colors.textLight,
        fontWeight: '600',
        marginHorizontal: 8,
    },
    loginLink: {
        alignItems: 'center',
        marginTop: 24,
    },
    loginLinkText: {
        fontSize: 12,
        color: colors.textLight,
        letterSpacing: 0.5,
         paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        width: '100%',
        textAlign: 'center',
    },
    loginLinkBold: {
        color: colors.link,
        fontWeight: '800',
    },
});