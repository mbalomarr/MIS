namespace PmuMisHub.Infrastructure;

/// <summary>Tailwind class strings shared by several views, so form styling is defined once.</summary>
public static class Ui
{
    public const string Label = "mb-2 block text-sm font-semibold text-ink-800";

    public const string Control =
        "w-full rounded-lg border border-paper-200 bg-white px-3.5 py-3 text-sm text-ink-800 placeholder:text-ink-300 " +
        "transition-[border-color,box-shadow] duration-300 focus:border-signal-500 focus:shadow-[0_0_0_3px_rgb(47_184_198/0.18)] focus:outline-none " +
        "[&.input-validation-error]:border-danger [&.input-validation-error]:shadow-[0_0_0_3px_rgb(214_69_69/0.14)]";

    public const string Hint = "mt-1.5 text-xs text-ink-400";

    public const string Error = "mt-1.5 block min-h-4 text-xs text-danger";
}
