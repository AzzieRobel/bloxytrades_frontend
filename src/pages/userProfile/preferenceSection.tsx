

export const PreferenceSection = () => {
    return (
        <div className="p-6 text-left pb-0">
            <h2 className="text-xl font-semibold text-white border-t border-white/20 pt-6 mb-6">Preferences</h2>

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-400 w-24 flex-shrink-0">Language</label>
                    <span className="flex-1 text-white">English</span>
                </div>
                <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-400 w-24 flex-shrink-0">Currency</label>
                    <span className="flex-1 text-white">USD</span>
                </div>
            </div>
        </div>
    )
}