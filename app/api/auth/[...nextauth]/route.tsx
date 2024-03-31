import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {compare} from "bcrypt";

export const { handlers: { GET, POST }, auth } = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				password: {},
				email: {}
			},
			async authorize(credentials, req) {
				const user = await prisma.user.findUnique({where: {email: credentials.email}})
				if (!user) return null
				const passwordCorrect = await compare(credentials.password, user.password)
				if (passwordCorrect) return {
					id: user.id,
					name: user.name,
					email: user.email,
					image: user.image
				}
				return null
			}
		})
	],
	session: {strategy: "jwt"}
})
