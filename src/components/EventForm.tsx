import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const schema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Minimal 8 karakter"),
  kategori: z.string().min(1, "Pilih kategori"),
  bio: z.string().min(1, "Bio wajib diisi"),
});

type FormData = z.infer<typeof schema>;

export default function EventForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log(data);
    toast.success("Berhasil submit!");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-200 text-left"
    >
      {/* Judul */}
      <h2 className="text-3xl font-bold mb-2 text-gray-800">
        Form Registrasi Event
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        Silakan isi data untuk mengikuti event
      </p>

      {/* Nama */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700">
          Nama Lengkap
        </label>
        <input
          {...register("nama")}
          placeholder="Masukkan nama"
          className="w-full mt-1 border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <p className="text-red-500 text-sm mt-1">{errors.nama?.message}</p>
      </div>

      {/* Email */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          {...register("email")}
          placeholder="email@gmail.com"
          className="w-full mt-1 border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
      </div>

      {/* Password */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          placeholder="••••••••"
          className="w-full mt-1 border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
      </div>

      {/* Kategori */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700">
          Kategori Event
        </label>
        <select
          {...register("kategori")}
          className="w-full mt-1 border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="">Pilih kategori</option>
          <option value="seminar">Seminar</option>
          <option value="workshop">Workshop</option>
          <option value="webinar">Webinar</option>
        </select>
        <p className="text-red-500 text-sm mt-1">{errors.kategori?.message}</p>
      </div>

      {/* Bio */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Bio
        </label>
        <textarea
          {...register("bio")}
          placeholder="Ceritakan sedikit tentang diri kamu..."
          className="w-full mt-1 border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <p className="text-red-500 text-sm mt-1">{errors.bio?.message}</p>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-xl font-semibold transition"
      >
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}
