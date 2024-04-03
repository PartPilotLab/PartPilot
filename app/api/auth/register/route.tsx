import {NextRequest, NextResponse} from "next/server";
import {hash} from 'bcrypt'
import {z} from "zod"

const UserSchema = z.object({
	name: z.string().optional(),
	email: z.string().email(),
	password: z.string()
})

export async function POST(req: NextRequest) {
	try {
		const parsedBody = await req.json()

		const validationResult = UserSchema.safeParse(parsedBody)
		if (!validationResult.success) return NextResponse
			.json({error: "Invalid user creation payload"}, {status: 400})

		const hashedPassword = await hash(validationResult.data.password, 10)

		const user = await prisma.user.create({
			data: {
				...validationResult.data,
				password: hashedPassword
			}
		})

		return NextResponse.json(user)
	} catch (e) {
		if(e.code === "P2002") {
			// Unique constraint error --> Email already exists
			return NextResponse.json({error: "Email already registered"}, {status: 400})
		}
		return NextResponse.json({error: "Error while creating a new user"}, {status: 400})
	}
}
