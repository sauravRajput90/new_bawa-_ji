import { Doctor } from "@/types/doctor"

// Initialize the doctors array with some default values
let doctors: Doctor[] = [
  {
    id: "DOC-1001",
    name: "Dr. Simran Kaur",
    department: "Medical Director",
    qualification: "MBBS",
    designation: "Senior Consultant",
    specialization: null,
    experience: null,
    availability: true,
    consultationType: "offline",
    rating: 0,
    profilePhoto: "/placeholder.svg?height=100&width=100",
    email: null,
    phone: null,
    registrationNo: null,
  },
  {
    id: "DOC-1002",
    name: "Dr. Krishan Chand",
    department: "M.S. (Surgery), Retd. Civil Surgeon, Gurdaspur",
    qualification: "M.S. (Surgery)",
    designation: "Retd. Civil Surgeon",
    specialization: null,
    experience: null,
    availability: true,
    consultationType: "offline",
    rating: 0,
    profilePhoto: "/placeholder.svg?height=100&width=100",
    email: null,
    phone: null,
    registrationNo: null,
  },
  {
    id: "DOC-1003",
    name: "Dr. Gurpreet Josan",
    department: "MBBS (MD) Anaesthesia",
    qualification: "MD, Anaesthesia",
    designation: "Consultant",
    specialization: "Anaesthesia",
    experience: null,
    availability: true,
    consultationType: "offline",
    rating: 0,
    profilePhoto: "/placeholder.svg?height=100&width=100",
    email: null,
    phone: null,
    registrationNo: null,
  },
  {
    id: "DOC-1004",
    name: "Dr. Jaspal Singh",
    department: "M.S. (Surgery)",
    qualification: "M.S. (Surgery)",
    designation: "Consultant",
    specialization: "Surgery",
    experience: null,
    availability: true,
    consultationType: "offline",
    rating: 0,
    profilePhoto: "/placeholder.svg?height=100&width=100",
    email: null,
    phone: null,
    registrationNo: null,
  },
  {
    id: "DOC-1005",
    name: "Dr. H.P. Singh",
    department: "M.S. Orthopedic Surgeon",
    qualification: "M.S. (Orthopedics)",
    designation: "Orthopedic Surgeon",
    specialization: "Orthopedics",
    experience: null,
    availability: true,
    consultationType: "offline",
    rating: 0,
    profilePhoto: "/placeholder.svg?height=100&width=100",
    email: null,
    phone: null,
    registrationNo: null,
  },
  {
    id: "DOC-1006",
    name: "Dr. Nidhi Puri",
    department: "M.D. (Pathology)",
    qualification: "M.D. (Pathology)",
    designation: "Consultant",
    specialization: "Pathology",
    experience: null,
    availability: true,
    consultationType: "offline",
    rating: 0,
    profilePhoto: "/placeholder.svg?height=100&width=100",
    email: null,
    phone: null,
    registrationNo: null,
  },
  {
    id: "DOC-1007",
    name: "Dr. Navjot Singh",
    department: "M.S. (Surgery)",
    qualification: "M.S. (Surgery)",
    designation: "Consultant",
    specialization: "Surgery",
    experience: null,
    availability: true,
    consultationType: "offline",
    rating: 0,
    profilePhoto: "/placeholder.svg?height=100&width=100",
    email: null,
    phone: null,
    registrationNo: null,
  },
]

// Function to get a doctor by ID
export const getDoctorById = (id: string): Doctor | undefined => {
  return doctors.find((doctor) => doctor.id === id)
}

// Function to get all departments
export const getAllDepartments = (): string[] => {
  const departments = doctors.map((doctor) => doctor.department)
  if (departments.some((dep) => dep === undefined)) {
    console.warn("Some doctors are missing the department property.")
  }
  return [...new Set(departments || ["General"])]
}

// Function to get all specializations
export const getAllSpecializations = (): string[] => {
  return [...new Set(doctors.map((doctor) => doctor.specialization))] 
}

// Function to get active doctors
export const getActiveDoctors = (): Doctor[] => {
  return doctors.filter((doctor) => doctor.availability)
}

// Function to get doctors by department
export const getDoctorsByDepartment = (department: string): Doctor[] => {
  return doctors.filter((doctor) => doctor.department === department)
}

// Function to format doctor info as a string
export const formatDoctorInfo = (doctor: Doctor): string => {
  return `${doctor.name} (${doctor.qualification})`
}

// Function to get all doctors
export const getDoctors = (): Doctor[] => {
  return doctors
}

// Function to add a new doctor
export const addDoctor = (doctor: Omit<Doctor, "id" | "rating">): Doctor => {
  const newDoctor: Doctor = {
    id: `DOC-${Math.random().toString(36).substr(2, 9)}`,
    rating: 0,
    ...doctor,
  }
  doctors = [...doctors, newDoctor]
  return newDoctor
}

// Function to update a doctor's details
export const updateDoctor = (id: string, updates: Partial<Doctor>): Doctor | undefined => {
  doctors = doctors.map((doctor) => (doctor.id === id ? { ...doctor, ...updates } : doctor))
  return getDoctorById(id)
}

// Function to delete a doctor by ID
export const deleteDoctor = (id: string): void => {
  doctors = doctors.filter((doctor) => doctor.id !== id)
}
