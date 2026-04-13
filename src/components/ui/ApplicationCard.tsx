export default function ApplicationCard({ app }: any) {

  const styles: any = {

    PENDING: "bg-yellow-100 text-yellow-700",

    REVIEWED: "bg-blue-100 text-blue-700",

    SHORTLISTED: "bg-purple-100 text-purple-700",

    ACCEPTED: "bg-green-100 text-green-700",

    REJECTED: "bg-red-100 text-red-700",

  };

  return (

    <div className="flex justify-between items-center border border-gray-200 rounded-xl p-4 bg-white">

      <div>

        <h3 className="font-semibold text-gray-800">{app.title}</h3>

        <p className="text-sm text-gray-500">{app.company} • {app.location} • {app.date}</p>

      </div>
      
      <div className={`px-3 py-1 text-sm font-medium rounded-full ${styles[app.status]}`}>
        {app.status}
      </div>

    </div>

  );

}
