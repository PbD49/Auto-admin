import { useEffect} from 'react';
import { useTranslation} from 'react-i18next';
import AuthForm from "../../features/auth-form/ui/AuthForm";

const LoginPage = () => {
    const { t } = useTranslation('loginPage');
    
    useEffect(() => {
        document.title = t('documentTitle');
    }, [t]);

    return (
        <section className="section login-page h-100">
            <div className="container flex flex-center h-100__percent">
                <AuthForm />
            </div>
        </section>
    );
};

export default LoginPage;