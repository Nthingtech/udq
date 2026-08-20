package data;

import io.quarkiverse.roq.data.runtime.annotations.DataMapping;

import java.util.List;

@DataMapping(value = "faqs", type = DataMapping.Type.ARRAY_FILE)
public record Faqs(List<Faq> list) {

    public record Faq(String question, String answer) {}
}
