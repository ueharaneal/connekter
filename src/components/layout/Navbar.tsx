import Link from "next/link"
import React from "react"
import { Button } from "@/components/ui/button"

function Navbar() {
	return (
		<nav className='h-14 border-b'>
			<div className='h-full container flex justify-between items-center mx-auto'>
				<h3 className=' text-xl font-semibold tracking-tight'>
					<Link href='/'>Auth Starter </Link>
				</h3>
				<ul className='flex items-center gap-x-4'>
					<li>
						{" "}
						<Button variant='outline' size='sm' asChild>
							<Link href='/auth/signin'>Sign In</Link>
						</Button>{" "}
						<Button variant='outline' size='sm' asChild>
							<Link href='/auth/signup'>Sign Up</Link>
						</Button>{" "}
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Navbar
