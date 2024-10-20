export interface IAuthState {
	isLogged: boolean;
	id: string | null;
	username: string | null;
	email: string | null;
	role: string | null;
}
