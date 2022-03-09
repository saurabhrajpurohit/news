export interface News {
    author: string;
    content: string;
    description: string;
    publishedAt: Date;
    source: {
        id: string;
        name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
};

export interface Category {
    categoryName: string;
    categoryUrl: string;
}

export interface Modal {
    open: boolean;
    onSubmit: (submit:boolean, data?: Category) => void;
}