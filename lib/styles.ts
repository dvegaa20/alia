// ============================================================================
// Shared ClassNames
// ============================================================================

/** Consistent styling for form field labels across the app */
export const LABEL_CX =
  'font-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground pointer-events-none'

/** Consistent styling for form inputs across the app */
export const INPUT_CX =
  'w-full bg-muted/50 border border-transparent hover:bg-muted rounded-lg px-4 py-2.5 h-auto min-h-[44px] focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-input focus-visible:bg-background transition-all duration-300 font-body text-foreground placeholder:text-muted-foreground/70'

/** Consistent styling for tabs triggers (like in OrgTabs) */
export const TAB_TRIGGER_CX =
  'rounded-none border-0 border-b-4 border-transparent data-[state=active]:border-b-primary dark:data-[state=active]:border-b-primary-200 data-[state=active]:text-primary dark:data-[state=active]:text-primary-200 data-[state=active]:font-bold data-[state=active]:shadow-none text-muted-foreground font-medium tracking-tight pb-4 px-0 bg-transparent! dark:data-[state=active]:bg-transparent hover:text-primary-900 dark:hover:text-primary-200 transition-colors cursor-pointer text-sm'
