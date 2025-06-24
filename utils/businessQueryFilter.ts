import { Business } from "../interfaces/Business";

export default function businessQueryFilter(query: string, business: Business) {
    const words = query.trim().split(" ");
    const businessQuery = generateBusinessQuery(business);

    for (const word of words) {
        if (businessQuery.includes(word.toLocaleLowerCase())) {
            return true;
        }
    }

    return false;
}

function generateBusinessQuery(business: Business) {
    const query = (
        business.address +
        business.category +
        business.city +
        business.description +
        business.email +
        business.name +
        business.services.reduce((acc, service: { title: string }) => {
            return acc + service.title;
        }, "")
    )
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "");
    return query;
}
