import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CardForm from '../../../shared/form/CardForm/CardForm';
import { ControlledInput } from '../../../shared/form/ControlledInput/ControlledInput';
import { Button } from '../../../shared/ui/Button/Button';
import { toast } from 'sonner';
import { AuthFormSchema, type AuthSchemaFormValues } from '../model/AuthForm.schema';
import { auth } from '../../../shared/api/auth';
import { useAuth } from '../../../app/providers/auth/AuthContext';
import { apiMessage } from '../../../shared/i18n/api-message';
import { applyFieldErrors } from '../../../shared/api/apply-field-errors';

interface FieldConfig {
    name: keyof AuthSchemaFormValues;
    label: string;
    type?: 'text' | 'password';
    placeholder: string;
}

const FIELDS: FieldConfig[] = [
    { name: 'userName', 
      label: t('fields.userName.label'),
      placeholder: t('fields.userName.placeholder'),
    }
    { name: 'password', 
      label: t('fields.password.label'), 
      type: 'password', 
      placeholder: t('fields.password.placeholder') },
] as const;

const AuthForm = () => {
    const { t } = useTranslation('authForm');
    const { refreshAuth } = useAuth();

    const {
        control,
        handleSubmit,
        setError,
        formState: { isSubmitting }
    } = useForm<AuthSchemaFormValues>({
        mode: 'onChange',
        resolver: zodResolver(AuthFormSchema),
        defaultValues: {
            userName: '',
            password: '',
        }
    });

    const onSubmit = async (data: AuthSchemaFormValues) => {
        try {
            await toast.promise(auth.login(data), {
                loading: t('requestInProgress',)
                success: (response) => apiMessage(response),
                error: (err) => {
                    applyFieldErrors(err, setError, ['userName', 'password']);
                    return apiMessage(err);
                },

            }).unwrap();

            await refreshAuth();
        } catch {
            // Ошибка уже отображена через toast
        }
    };

    return (
        <CardForm
            headerTitle={t('title')}
            headerDescription={t('decsription')}
            onSubmit={handleSubmit(onSubmit)}
        >
            {
                FIELDS.map((field) => (
                    <ControlledInput
                        key={field.name}
                        control={control}
                        name={field.name}
                        label={field.label}
                        type={field.type}
                        placeholder={field.placeholder}
                    />
                ))
            }
            <Button
                type={t('submit')}
                variant='primary'
                className="check-button w-100__percent"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                
            >
                
            </Button>
        </CardForm>
    );
};

export default AuthForm;