import TemplateContainer from "@/components/Templates/TemplateContainer/TemplateContainer";

export default function TemplateView({
    params,
}: { params: { templateId: string} }) {
    return (
        <TemplateContainer templateId={params.templateId} />
    );
};