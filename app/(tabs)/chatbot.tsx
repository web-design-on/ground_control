import { ChatBubbleList } from "@/components/ChatBubble";
import { Input } from "@/components/Input";
import { colors } from "@/constants/theme";
import { useRef } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ChatbotScreen() {
const scrollRef = useRef<ScrollView>(null);

    return (
        <KeyboardAvoidingView
            style={styles.root}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.header}>
                <Image
                    source={require("../../assets/icons/navigation/luminha.png")}
                    style={styles.headerAvatar}
                />
                <Text style={styles.headerTitle}>Luminha</Text>
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
                ref={scrollRef}
            >
                <ChatBubbleList
                    messages={[
                        {
                            id: "1",
                            role: "user",
                            text: "Hoje está sendo um dia difícil. Estou começando a sentir o peso da responsabilidade que assumi aceitando essa missão. Tenho muito medo de não conseguir voltar para a casa.",
                            time: "7:20",
                        },
                        {
                            id: "2",
                            role: "bot",
                            text: "Imagino como isso pode ser desafiador. Estar cercado por algo extraordinário não impede que sentimentos de solidão apareçam. O que está pesando mais para você nesse momento?",
                            time: "7:20",
                        },
                        {
                            id: "3",
                            role: "user",
                            text: "Acho que é a distância. Faz meses que não vejo minha família pessoalmente. As fotos e vídeos ajudam, mas não é a mesma coisa. Sinto que isso afeta a mim mais que aos outros...",
                            time: "7:21",
                        },
                        {
                            id: "4",
                            role: "bot",
                            text: "Digitando...",
                            time: "", 
                        }
                    ]}
                />
            </ScrollView>

            <View style={styles.inputBar}>
                <View style={styles.inputWrapper}>
                    <Input
                        placeholder="Escreva sua mensagem..."
                        value={""}
                        onChangeText={() => {}}
                    />
                </View>

                <TouchableOpacity style={styles.sendButton}>
                    <Image
                        source={require("../../assets/icons/chatbot/send.png")}
                        style={styles.sendIcon}
                    />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.lightGray,
        marginTop: 32,
    },
    header: {
        backgroundColor: colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingVertical: 16,
    },
    headerAvatar: {
        width: 48,
        height: 48,
    },
    headerTitle: {
        color: colors.white,
        fontSize: 32,
        fontWeight: "600",
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 16,
        gap: 16,
    },
    inputBar: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        paddingHorizontal: 24,
        backgroundColor: colors.white,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    inputWrapper: {
        flex: 1,
    },
    sendButton: {
        backgroundColor: colors.primary,
        width: 50,
        height: 50,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16
    },
    sendIcon: {
        width: 32,
        height: 32,
    },
});