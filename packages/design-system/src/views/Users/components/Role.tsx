import { UniTag, UniTagProps } from '../../../components/tag/UniTag';
import { allColors } from '../../../theme/themeAntDesign';

export interface RoleProps {
    value: {
        tags: UniTagProps[];
        type?: string;
    };
}

export const Role = ({ value }: RoleProps) => {
    return (
        <div className="assigned-partner-cell">
            {value?.tags?.map((item: any, index: number) => (
                <UniTag
                    key={index}
                    {...item}
                    type={value.type}
                    size="small"
                    borderColor={allColors['--bcolor-neutral-500']}
                    backgroundColor={allColors['--bcolor-neutral-0']}
                >
                    {item.value}
                </UniTag>
            ))}
        </div>
    );
};
