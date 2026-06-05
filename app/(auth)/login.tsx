import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { PrimaryButton } from '../../components/Button';
import { Input } from '../../components/Input';
import { colors } from '../../constants/theme';
import { validateLogin } from '../../hooks/useValidation';

export default function LoginScreen() {
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [loading, setLoading] = useState(false);

    function updateField(field: string, value: string) {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    async function handleLogin() {
        const { errors: formErrors, isValid } = validateLogin(form);
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

            <SafeAreaView style={styles.safe}>
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

                        <Text style={styles.title}>Bem-vindo de volta!</Text>

                        <TouchableOpacity style={styles.facebookBtn} onPress={() => { }}>
                            <Image source={require('../../assets/images/fece.png')} style={styles.socialIcon} resizeMode="contain" />
                            <Text style={styles.facebookText}>CONTINUE COM FACEBOOK</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.googleBtn} onPress={() => { }}>
                            <Image source={require('../../assets/images/google.png')} style={styles.socialIcon} resizeMode="contain" />
                            <Text style={styles.googleText}>CONTINUE COM GOOGLE</Text>
                        </TouchableOpacity>

                        <View style={styles.divider}>
                            <View style={styles.line} />
                            <Text style={styles.dividerText}>OU ENTRE COM E-MAIL</Text>
                            <View style={styles.line} />
                        </View>

                        <Input
                            placeholder="Endereço de e-mail"
                            value={form.email}
                            onChangeText={v => updateField('email', v)}
                            error={errors.email}
                            keyboardType="email-address"
                        />
                        <Input
                            placeholder="Senha"
                            value={form.password}
                            onChangeText={v => updateField('password', v)}
                            error={errors.password}
                            secureTextEntry
                        />

                        <PrimaryButton title="ENTRE" onPress={handleLogin} loading={loading} />

                        <TouchableOpacity
                            onPress={() => Alert.alert('Recuperar senha', 'Enviaremos um link para seu e-mail.')}
                            style={styles.forgotBtn}
                        >
                            <Text style={styles.forgotText}>Esqueceu a senha?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => router.push('/(auth)/register')}
                            style={styles.registerLink}
                        >
                            <Text style={styles.registerLinkText}>
                                AINDA NÃO TEM UMA CONTA?{' '}
                                <Text style={styles.registerLinkBold}>CADASTRE-SE</Text>
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
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
        paddingHorizontal: 32,
        paddingBottom: 48,
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
    backBtn: {
        marginTop: 60,
        marginBottom: 50,
        alignSelf: 'flex-start',
    },
    backArrow: {
        fontSize: 40,
        color: colors.navy,
        fontWeight: '600',
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        color: colors.navy,
        marginBottom: 24,
        textAlign: 'center',
    },
    facebookBtn: {
        backgroundColor: colors.facebook,
        borderRadius: 100,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 27,
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
        marginBottom: 12,
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
    forgotBtn: {
        alignItems: 'center',
        marginTop: 16,
    },
    forgotText: {
        fontSize: 13,
        color: colors.textMedium,
    },
    registerLink: {
        alignItems: 'center',
        marginTop: 70,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    registerLinkText: {
        fontSize: 11,
        color: colors.textLight,
        letterSpacing: 0.5,
    },
    registerLinkBold: {
        color: colors.link,
        fontWeight: '800',
    },
});