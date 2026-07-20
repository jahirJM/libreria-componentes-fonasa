/**
 * Skeleton loader que replica la estructura del componente UploadBox.
 */
export function SkeletonUploadBox() {
  return (
    <div className="flex flex-col justify-center items-center w-full p-5 rounded-md border-dotted border-2 border-gray-200 bg-gray-100 animate-pulse">
      {/* Ícono */}
      <div className="h-8 w-8 bg-gray-200 rounded-full mb-2" />

      {/* Texto principal */}
      <div className="h-4 bg-gray-200 rounded w-48 mb-2" />

      {/* Texto secundario */}
      <div className="h-3 bg-gray-200 rounded w-56" />
    </div>
  );
}
