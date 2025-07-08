import VisitorForm from "@/components/visitors/VisitorsForm";
import { getVisitorById } from "@/lib/actions/visitorActions";

export default async function EditVisitorPage({ params }) {
    const { id } = params;
    const { data } = await getVisitorById(id);

    return (
        <div>
            <VisitorForm
                mode="edit"
                visitor={JSON.parse(JSON.stringify(data))}
            />
        </div>
    );
}