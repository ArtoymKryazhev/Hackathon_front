import { Cell, Pie, PieChart } from 'recharts'

import { formatCurrency } from '../../../lib/utils/formatters.js'

import styles from './DonutChartCard.module.css'

const CHART_SIZE = 152
const PIE_CENTER = CHART_SIZE / 2
/** Центральный диск 82px (r=41) + зазор до дуг как в Figma */
const CENTER_DISC_RADIUS = 41
const RING_GAP = 7
const INNER_RADIUS = CENTER_DISC_RADIUS + RING_GAP
const OUTER_RADIUS = 63
const RING_THICKNESS = OUTER_RADIUS - INNER_RADIUS
const PADDING_ANGLE = 2.5
/** Почти полукруглые «капсулы» на концах сегмента */
const CORNER_RADIUS = RING_THICKNESS / 2
const PIE_START_ANGLE = 0

export function DonutChartCard({ title, data, totalAmount, monthLabel }) {
  const hasData = Array.isArray(data) && data.length > 0
  const formattedTotal = formatCurrency(totalAmount)

  return (
    <section className={styles.root} aria-label={title}>
      <h2 className={styles.title}>{title}</h2>

      {!hasData ? (
        <p className={styles.empty}>Нет данных за период</p>
      ) : (
        <div className={styles.body}>
          <div className={styles.chartWrap}>
            <PieChart
              width={CHART_SIZE}
              height={CHART_SIZE}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              className={styles.chart}
            >
              <Pie
                data={data}
                dataKey="percent"
                nameKey="category_name"
                cx={PIE_CENTER}
                cy={PIE_CENTER}
                innerRadius={INNER_RADIUS}
                outerRadius={OUTER_RADIUS}
                startAngle={PIE_START_ANGLE}
                endAngle={PIE_START_ANGLE + 360}
                stroke="none"
                isAnimationActive={false}
                paddingAngle={PADDING_ANGLE}
                cornerRadius={CORNER_RADIUS}
                label={false}
                labelLine={false}
              >
                {data.map((entry) => (
                  <Cell key={entry.category_name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>

            <div className={styles.centerDisc} aria-hidden="true">
              <div className={styles.center}>
                {monthLabel ? <p className={styles.monthLabel}>{monthLabel}</p> : null}
                <p className={styles.centerAmount}>{formattedTotal}</p>
              </div>
            </div>
          </div>

          <ul className={styles.legend} aria-label="Легенда диаграммы">
            {data.map((entry) => (
              <li key={entry.category_name} className={styles.legendItem}>
                <span className={styles.legendDotCell}>
                  <svg
                    className={styles.legendDot}
                    viewBox="0 0 11 11"
                    width={11}
                    height={11}
                    aria-hidden="true"
                  >
                    <circle cx="5.5" cy="5.5" r="5.5" fill={entry.color} />
                  </svg>
                </span>
                <span className={styles.legendName}>{entry.category_name}</span>
                <span className={styles.legendAmount}>
                  {formatCurrency(entry.totalAmount)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
