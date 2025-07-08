import { getUserById } from "@/lib/actions/userActions";
import UserForm from "@/components/users/UsersForm";

export default async function EditUserPage({ params }) {
    const { id } = params;
    const { data } = await getUserById(id);

    return (
        <div>
            <UserForm
                mode="edit"
                user={JSON.parse(JSON.stringify(data))}
            />
        </div>
    );
}