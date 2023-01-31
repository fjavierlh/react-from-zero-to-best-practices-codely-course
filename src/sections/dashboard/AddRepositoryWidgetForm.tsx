import { FormEvent, useState } from "react";

import { ReactComponent as Add } from "../../assets/svgs/add.svg";
import { RepositoryAlreadyExistsError } from "../../domain/RepositoryAlreadyExistsError";
import { RepositoryURLisNotValidError } from "../../domain/RepositoryURLisNotValidError";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";
import styles from "./AddRepositoryWidgetForm.module.scss";
import { useAddRepositoryWidget } from "./useAddRepositoryWidget";

type FormFields = { id: string; url: string };

type GenericFormEvent<T> = FormEvent<HTMLFormElement> & {
	target: { elements: { [key in keyof T]: { value: T[key] } } };
};

export function AddRepositoryWidgetForm({
	repositoryWidget,
}: {
	repositoryWidget: RepositoryWidgetRepository;
}) {
	const [isFormActive, setIsFormActive] = useState(false);
	const [hasAlreadyExistsError, setHasAlreadyExistsError] = useState(false);
	const [isNotValidURLError, setIsNotValidURLError] = useState(false);
	const { add } = useAddRepositoryWidget(repositoryWidget);

	const submitForm = async (event: GenericFormEvent<FormFields>) => {
		event.preventDefault();
		const { id, url } = event.target.elements;
		const error = await add({ id: id.value, url: url.value });

		if (error instanceof RepositoryURLisNotValidError) {
			setIsNotValidURLError(true);

			return;
		}

		if (error instanceof RepositoryAlreadyExistsError) {
			setHasAlreadyExistsError(true);

			return;
		}

		setIsFormActive(false);
	};

	return (
		<article className={styles.add_widget}>
			<div className={styles.container}>
				{!isFormActive && !hasAlreadyExistsError ? (
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
						{hasAlreadyExistsError && (
							<p className={styles.error} role="alert" aria-describedby="duplicated-error">
								<span id="duplicated-error">Repositorio duplicado</span>
							</p>
						)}
						{isNotValidURLError && (
							<p className={styles.error} role="alert" aria-describedby="not-valid-url-error">
								<span id="not-valid-url-error">Introduce una url válida</span>
							</p>
						)}
					</form>
				)}
			</div>
		</article>
	);
}
