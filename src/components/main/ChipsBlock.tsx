import { CalculationResult } from '../../common/model/calculation.model.js';
import { formatBigNumber } from '../../common/utils/formatter.js';

type ChipsBlockProps = {
  result: CalculationResult | undefined;
};

export default function ChipsBlock({ result: res }: ChipsBlockProps) {
  return (
    <div className="row">
      <div className="combo">
        {res && res.comboProperties.name && (
          <div className="combo-name">{res.comboProperties.name}</div>
        )}
      </div>
      <div className="calculation">
        {res && (
          <div className="result">
            {res && res.baseValue !== 0 && (
              <>
                {res.baseValue === res.result && formatBigNumber(res.result)}
                {res.baseValue !== res.result && (
                  <>
                    {formatBigNumber(res.baseValue)}
                    {res.upgradeMultiplier > 1 &&
                      ` x ${formatBigNumber(res.upgradeMultiplier)}`}
                    {` = ${formatBigNumber(res.result)}`}
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
