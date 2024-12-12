import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import DashboardAdmin from "./Dashboard";
import AddArticle from "./Add";
import { useUser } from "../../helpers/UserContext";
import { Images } from "./Images";

export const AdminSection: React.FC = () => {
    const [currentSection, setCurrentSection] = useState('dashboard');
    const { user } = useUser();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (!user && countdown > 0) {
            const timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (!user && countdown === 0) {
            window.location.href = '/login';
        }
    }, [countdown, user]);

    const renderSection = () => {
        switch (currentSection) {
            case 'dashboard':
                return <DashboardAdmin />;
            case 'article':
                return <AddArticle />;
            case 'images':
                return <Images />;
            default:
                return <DashboardAdmin />;
        }
    };

    return (
        <>
            <div className="flex mt-14">
                {!user && countdown > 0 ? (
                    <main className="flex-1 p-4">
                        <div className="text-center text-red-600 font-bold text-2xl">
                            Mengarahkan ke halaman login dalam {countdown} detik...
                        </div>
                    </main>
                ) : (
                    <>
                        <Sidebar setCurrentSection={setCurrentSection} />
                        <main className="flex-1 p-4">
                            {renderSection()}
                        </main>
                    </>
                )}
            </div>
        </>
    );
};
