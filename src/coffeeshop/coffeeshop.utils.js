export const processCategory = (slug) => {
    const categories = caption.match(/#[\w]+/g) || [];
    return categories.map((category) => ({
        where: { category },
        create: { category },
    }));
};