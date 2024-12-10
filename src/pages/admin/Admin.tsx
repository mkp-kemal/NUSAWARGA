import { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import DashboardAdmin from "./Dashboard";
import AddArticle from "./Add";

export const AdminSection: React.FC = () => {
    const [currentSection, setCurrentSection] = useState('dashboard');
    // const [countdown, setCountdown] = useState(5);

    // useEffect(() => {
    //     if (countdown > 0) {
    //         const timer = setInterval(() => {
    //             setCountdown(prev => prev - 1);
    //         }, 1000);

    //         return () => clearInterval(timer);
    //     } else if (countdown === 0) {
    //         // setAdminCountdown(false); // Contoh penggunaan fungsi
    //         window.location.href = '/login';
    //     }
    // }, [countdown]);

    const renderSection = () => {
        switch (currentSection) {
            case 'dashboard':
                return <DashboardAdmin />;
            case 'article':
                return <AddArticle />;
            default:
                return <DashboardAdmin />;
        }
    };

    return (
        <>
            <div className="flex mt-14">
                {/* {countdown > 0 ? (
                    <main className="flex-1 p-4">
                        <div className="text-center text-red-600 font-bold text-2xl">
                            Mengarahkan ke halaman login dalam {countdown} detik...
                        </div>
                    </main>
                ) : ( */}
                    <>
                        <Sidebar setCurrentSection={setCurrentSection} />
                        <main className="flex-1 p-4">
                            {renderSection()}
                        </main>
                    </>
                {/* )} */}
            </div>
        </>
    );
};
