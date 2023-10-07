export default function MyDropdown({periodOfTime, setPeriodOfTime}) {
    const items = [
        {
            key: "month",
            label: "За последний месяц"
        },
        {
            key: "half_year",
            label: "За последние 6 месяцев"
        },
        {
            key: "year",
            label: "За последний год"
        }
    ];

    const getButtonText = () => {
        switch(periodOfTime) {
            case "month":
                return "За последний месяц"
            case "half_yaer":
                return "За последние 6 месяцев"
            case "year":
                return "За последний год"
        }
        return "Выберите период"
    }

    return (
        <div className="select-container">
          <select onChange={e => setPeriodOfTime(e.target.value)} 
          className="w-[380px] h-[48px] border-2 border-[#000AFF] rounded-[28px]">
            {items.map((item) => (
              <option key={item.key} value={item.key}>{item.label}</option>
            ))}
          </select>
        </div>
    )
}