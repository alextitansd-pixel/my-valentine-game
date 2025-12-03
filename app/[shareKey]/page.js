import PasswordForm from '../../components/PasswordForm';

export default function PasswordPage({ params }) {
  return <PasswordForm shareKey={params.shareKey} />;
}
