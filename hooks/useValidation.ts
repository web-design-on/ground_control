export function isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
}

export function validatePassword(password: string): { valid: boolean; message: string } {
    if (password.length < 6) {
        return { valid: false, message: 'A senha deve ter pelo menos 6 caracteres.' };
    }
    if (!/\d/.test(password)) {
        return { valid: false, message: 'A senha deve conter pelo menos um número.' };
    }
    return { valid: true, message: '' };
}

export function validateLogin(form: { email: string; password: string }) {
    const errors: { email?: string; password?: string } = {};

    if (!isValidEmail(form.email)) {
        errors.email = 'Informe um e-mail válido.';
    }
    if (form.password.length < 1) {
        errors.password = 'Informe sua senha.';
    }

    return { errors, isValid: Object.keys(errors).length === 0 };
}

export function validateRegister(form: {
    name: string;
    email: string;
    password: string;
    confirm: string;
}) {
    const errors: {
        name?: string;
        email?: string;
        password?: string;
        confirm?: string;
    } = {};

    if (form.name.trim().split(' ').length < 2) {
        errors.name = 'Informe seu nome completo.';
    }
    if (!isValidEmail(form.email)) {
        errors.email = 'Informe um e-mail válido.';
    }

    const pw = validatePassword(form.password);
    if (!pw.valid) {
        errors.password = pw.message;
    }
    if (form.password !== form.confirm) {
        errors.confirm = 'As senhas não coincidem.';
    }

    return { errors, isValid: Object.keys(errors).length === 0 };
}