const Avatar = ({ alt, fallback }: { alt?: string; fallback: string }) => {
  return (
      <button
          className="flex items-center gap-2 border border-border rounded-full px-2 py-1 bg-[#ffe0c2] text-primary-foreground"
          type="button"
          tabIndex={0}
          aria-label={`Cliente ${alt}`}
      >
          <span className="font-medium text-sm">{alt?.toLowerCase().replace(/ /g, '') || fallback}</span>
      </button>
  )
}

export default Avatar;