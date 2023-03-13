import { FormEvent } from "react";

export type GenericFormEvent<T> = FormEvent<HTMLFormElement> & {
	target: { elements: { [key in keyof T]: { value: T[key] } } };
};
