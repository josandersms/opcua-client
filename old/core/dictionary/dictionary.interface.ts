export type Tuple<T> = {
    key: string;
    value: T | undefined;
}

export interface IDictionary<T> {
    [key: string]: Tuple<T>;
}

/*
    add(key: string, value: T): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): T[];
} */