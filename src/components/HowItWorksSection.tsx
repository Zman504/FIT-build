import { BadgePercent, CheckCircle2, Database, Sparkles } from 'lucide-react';

const USDA_URL = 'https://fdc.nal.usda.gov/';
const FDA_DV_URL =
  'https://www.fda.gov/food/nutrition-facts-label/how-understand-and-use-nutrition-facts-label';

const steps = [
  {
    title: 'AI-assisted meal understanding',
    body:
      'Use photo, text, or voice logging to help identify foods and estimate portions when exact amounts are not entered.',
    Icon: Sparkles,
  },
  {
    title: 'Nutrition data from public databases',
    body:
      'Identified foods are mapped to nutrient profiles using public nutrition data such as USDA FoodData Central.',
    Icon: Database,
  },
  {
    title: 'FDA Daily Values for context',
    body:
      'Nutrients are contextualized using FDA Daily Values, the same reference framework used on Nutrition Facts labels, so users can understand what is high, low, or missing.',
    Icon: BadgePercent,
  },
  {
    title: 'Deterministic scoring + explainability',
    body:
      'Food Impact is calculated from nutrient totals and scoring rules, not AI guessing. The app highlights key nutrient drivers so users can understand what shaped the result.',
    Icon: CheckCircle2,
  },
];

export function HowItWorksSection() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-slate-900">
            How F.I.T. Works
          </h2>
          <p className="text-base text-slate-600">
            AI helps identify foods. Public nutrition standards support the
            score. Clear nutrient drivers show what shaped the result.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ title, body, Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-2 text-slate-700">
                <Icon className="h-4 w-4" />
                <p className="text-base font-semibold">{title}</p>
              </div>
              <p className="mt-3 text-base text-slate-600">{body}</p>
            </div>
          ))}
        </div>

        <p className="text-base text-slate-600 text-center">
          Food Impact is a meal-quality signal that helps show how meals,
          nutrients, and nutrient gaps contribute to your overall nutrition
          pattern over time.
        </p>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-base font-semibold text-slate-900">Transparency</p>
          <p className="mt-2 text-base text-slate-600">
            AI helps interpret your meal. The score itself is calculated by
            rules from nutrient totals - not by AI "guessing".
          </p>
        </div>

        <div className="flex flex-col gap-2 text-base text-slate-600">
          <p>
            Learn more from the source standards:
            <a
              href={USDA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-700 hover:text-blue-800"
            >
              USDA FoodData Central
            </a>
            <span className="mx-2 text-slate-400">|</span>
            <a
              href={FDA_DV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-800"
            >
              FDA Daily Value / %DV explainer
            </a>
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs text-slate-600">
            F.I.T. is an educational nutrition tool and is not medical
            advice. FDA provides public labeling standards and Daily Values, but
            does not evaluate or approve F.I.T.
          </p>
        </div>
      </div>
    </section>
  );
}
