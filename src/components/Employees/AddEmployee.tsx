"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { registerUserRequest, resetUserRegistration } from "@/lib/reducers/userReducer";
import { User } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
const EmployeeCreate: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.userData.status);
    const error = useAppSelector((state) => state.userData.error);
    const userRegistered = useAppSelector((state) => state.userData.userRegistered);
    const { toast } = useToast();
    // State for form inputs
    const [formData, setFormData] = useState<User>({
        firstName: "",
        lastName: "",
        position: "",
        department: "",
        email: "",
        phone: "",
        password: "",
        startDate: null,
        salary: 0,
        role: "EMPLOYEE", // Added role field
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerUserRequest(formData));
        // Redirect to employee list (or show a success message)
    };
    useEffect(() => {
        if (userRegistered != null) {
            toast({
                title: "User Acount  Created!",
                description: "user Acount created successfully!",
                variant: "default"
            })
        dispatch(resetUserRegistration())

        router.push("/users");

        }
        else if (status==='Failed') {
            toast({
                title: "Failed!",
                description: error || "Failed to create an acount",
                variant: "destructive"
            })
        dispatch(resetUserRegistration())

        }
    }, [userRegistered, error])
    return (
        <div className="mx-auto px-4 py-4">
            <h1 className="text-xl mb-6">Create New Employee</h1>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium">First Name</label>
                        <Input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter first name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Last Name</label>
                        <Input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter last name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Position</label>
                        <Input
                            type="text"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            placeholder="Enter position"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Department</label>
                        <Input
                            type="text"
                            name="department"
                            value={formData.department || ''}
                            onChange={handleChange}
                            placeholder="Enter department"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Phone</label>
                        <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Start Date</label>
                        <Input
                            type="date"
                            name="startDate"
                            value={formData.startDate ? formData.startDate.toISOString().split("T")[0] : ""} // Convert Date to YYYY-MM-DD
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value ? new Date(e.target.value) : null })}
                        />

                    </div>

                    <div>
                        <label className="block text-sm font-medium">Salary</label>
                        <Input
                            type="number"
                            name="salary"
                            value={formData.salary || 0}
                            onChange={handleChange}
                            placeholder="Enter salary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="" disabled>Select role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="EMPLOYEE">Employee</option>
                            <option value="PARTNER">Partner</option>
                            <option value="TRAVEL_AGENT">Travel Agent</option>

                        </select>
                    </div>
                </div>

                <Button type="submit" className="bg-green-800 hover:bg-green-500 text-white">
                    Create
                </Button>
            </form>
        </div>
    );
};

export default EmployeeCreate;
