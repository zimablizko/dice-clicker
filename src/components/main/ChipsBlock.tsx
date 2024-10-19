import { CalculationResult } from '../../common/model/calculation.model.js';

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
                {res.baseValue === res.result && res.result}
                {res.baseValue !== res.result && (
                  <>
                    {res.baseValue}
                    {res.upgradeMultiplier > 1 && ` x ${res.upgradeMultiplier}`}
                    {` = ${res.result}`}
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
