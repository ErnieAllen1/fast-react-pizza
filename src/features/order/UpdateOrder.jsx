import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
export default function UpdateOrder() {
  const fetcher = useFetcher();
  const isUpdating = fetcher.state === "submitting";

  return (
    <fetcher.Form method="PATCH">
      <div className="text-right">
        <Button type="primary" disabled={isUpdating}>
          {isUpdating ? "Adding priority..." : "Add priority"}
        </Button>
      </div>
      {fetcher.data?.error && (
        <p className="mt-2 text-right text-sm text-red-600">
          {fetcher.data.error}
        </p>
      )}
      {fetcher.data?.success && (
        <p className="mt-2 text-right text-sm text-green-600">
          Priority added successfully.
        </p>
      )}
    </fetcher.Form>
  );
}

export async function action({ params }) {
  try {
    await updateOrder(params.orderId, { priority: true });
    return { success: true };
  } catch {
    return { error: "Could not add priority. Please try again." };
  }
}
