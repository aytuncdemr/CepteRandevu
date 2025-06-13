import { Business, ServiceCategory } from "../interfaces/Business";

export default function businessQueryFilter(query: string, business: Business) {
    const words = query.split(" ");
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
        business.serviceCategories
            .map(
                (serviceCategory: ServiceCategory) =>
                    serviceCategory.title +
                    serviceCategory.services
                        .map((service) => service.name)
                        .join("")
            )
            .join("")
    )
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "");
    return query;
}
