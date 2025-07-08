// EditDevicePage.js (Server Component)
import { getDeviceById } from "@/lib/actions/deviceActions";
import DeviceForm from "@/components/devices/DevicesForm";

export default async function EditDevicePage({ params }) {
    const { id } = params;
    const {data} = await getDeviceById(id);

    return (
        <div>
            <DeviceForm
                mode="edit"
                device={JSON.parse(JSON.stringify(data))}
            />
        </div>
    );
}