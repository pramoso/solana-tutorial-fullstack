import styles from "@/app/ui/home.module.css"
import AppBar from "@/app/ui/app-bar";
import SendSolForm from "./ui/send-sol-form";
import WalletContextProvider from "./ui/wallet-content-provider";
import BalanceDisplay from "./ui/balance-display";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <WalletContextProvider>
                <AppBar />
                <div className={styles.AppBody}>
                    <BalanceDisplay />
                    <SendSolForm />
                </div>
            </WalletContextProvider>
        </main>
    );
}
