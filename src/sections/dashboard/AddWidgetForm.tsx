import { FormEvent, useState } from "react";

import { ReactComponent as Add } from "../../assets/svgs/add.svg";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";
import styles from "./AddWidgetForm.module.scss";
import { useAddRepositoryWidget } from "./useAddRepositoryWidget";

type FormFields = { id: string; url: string };

type GenericFormEvent<T> = FormEvent<HTMLFormElement> & {
	target: { elements: { [key in keyof T]: { value: T[key] } } };
};

export function AddWidgetForm({
	repositoryWidget,
}: {
	repositoryWidget: RepositoryWidgetRepository;
}) {
	const [isFormActive, setIsFormActive] = useState(false);
	const { add } = useAddRepositoryWidget(repositoryWidget);

	const submitForm = async (event: GenericFormEvent<FormFields>) => {
		event.preventDefault();
		const { id, url } = event.target.elements;
		await add({ id: id.value, url: url.value });
		setIsFormActive(false);
	};

	return (
		<article className={styles.add_widget}>
			<div className={styles.container}>
				{!isFormActive ? (
					<button onClick={() => setIsFormActive(true)} className={styles.add_button}>
						<Add />
						<p>Añadir repositorio</p>
					</button>
				) : (
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					<form className={styles.form} onSubmit={submitForm}>
						<div>
							<label htmlFor="id">Id</label>
							<input type="text" id="id" />
						</div>
						<div>
							<label htmlFor="url">Url del repositorio</label>
							<input type="text" id="url" />
						</div>

						<div>
							<input type="submit" value={"Añadir"} />
						</div>
					</form>
				)}
			</div>
		</article>
	);
}
