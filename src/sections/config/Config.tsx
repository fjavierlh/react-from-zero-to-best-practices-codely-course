import { GenericFormEvent } from "../../domain/GenericFormEvent";
import { GitHubAccessTokenRepository } from "../../domain/GitHubAccessTokenRepository";
import styles from "./Config.module.scss";
import { useSaveConfig } from "./useSaveConfig";

type FormFields = { gitHubAccessToken: string };

export function Config({ repository }: { repository: GitHubAccessTokenRepository }) {
	const { save } = useSaveConfig(repository);

	const submitForm = (event: GenericFormEvent<FormFields>) => {
		event.preventDefault();
		const { gitHubAccessToken } = event.target.elements;
		save(gitHubAccessToken.value);

		window.location.href = "/";
	};

	return (
		<section className={styles.config}>
			<h2>Configuración</h2>
			<p>
				⚙️ Aquí puedes configurar tu GitHub Access Token para que <i>DevDash_</i> obtenga los datos
				de los repositorios de Github.
			</p>
			<p>
				Puedes obtener más info sobre cómo obtener el token{" "}
				<a
					target="_blank"
					href="https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
					rel="noreferrer"
				>
					aquí
				</a>
			</p>

			<form className={styles.form} onSubmit={submitForm}>
				<label htmlFor="gitHubAccessToken">GitHub Access Token</label>
				<input id="gitHubAccessToken" name="gitHubAccessToken" type="text" />

				<input type="submit" value="Guardar" />
			</form>
		</section>
	);
}
