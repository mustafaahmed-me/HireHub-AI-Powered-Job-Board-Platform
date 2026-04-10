import Container from "@/components/ui/Container";
import PostJobForm from "@/components/ui/PostJobForm";

const page = () => {
    
  return (
    <div className="w-full py-10 "> 
      <div className="w-[85%] md:w-[70%] mx-auto">
        <p className="text-2xl md:text-4xl font-bold">Post a New Job</p>
        <p className="text-[#4f4f4f] pt-5 text-sm md:text-md">Share your opportunity with talented professionals looking for thier next career move.</p>
        <PostJobForm />
      </div>
    </div>
  )
}

export default page